import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronRight, FiNavigation2 } from 'react-icons/fi';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import { ScrollTo } from 'react-scroll-to';

import api from '../../services/api';
import { languages } from '../../utils/languages';

import logoImg from '../../assets/logo.svg';

import {
  Title,
  Repositories,
  PagesIndex,
  SkeletonDiv,
  FabStyled,
} from './styles';

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  html_url: string;
}

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [currentPageRepos, setCurrentPageRepos] = useState<Repository[]>([]);
  const [openToast, setOpenToast] = React.useState(false);

  const Alert = useCallback((props: AlertProps): JSX.Element => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }, []);

  const getRepos = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get(
        `search/repositories?q=language:${encodeURIComponent(
          languageFilter,
        )}&page=${page}&per_page=10`,
      );
      setLoading(false);
      setError('');

      const repos = response.data.items;
      const pagesCount: number = parseInt(
        response.headers.link.split(',')[1].split('&')[1].split('=')[1],
        10,
      );

      setNumberOfPages(pagesCount);

      setCurrentPageRepos(repos);
    } catch (err) {
      if (page > numberOfPages && numberOfPages) {
        setError(`Esta listagem possui ${numberOfPages} páginas!`);
      } else {
        setError(`Houve um problema na requisição. ${err.message} !`);
      }

      setOpenToast(true);
      setNumberOfPages(0);
      setCurrentPageRepos([]);
      setLanguageFilter('');
    }
  }, [languageFilter, page]);

  useEffect(() => {
    if (languages.includes(languageFilter)) {
      getRepos();
    }
  }, [languageFilter, getRepos]);

  const handleChange = useCallback(async (event: any, value: unknown) => {
    const language = value as string;

    if (languages.includes(language)) {
      setLanguageFilter(language);
      setPage(1);
    }
  }, []);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

  const handleCloseToast = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenToast(false);
    },
    [],
  );

  return (
    <>
      <a href={window.location.href}>
        <img src={logoImg} alt="Github Voyager" />
      </a>

      <Title>Explore repositórios no Github.</Title>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert onClose={handleCloseToast} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {numberOfPages !== 0 && (
        <FabStyled>
          <ScrollTo>
            {({ scroll }) => (
              <Fab
                variant="extended"
                type="button"
                onClick={() => scroll({ x: 20, y: 0 })}
              >
                <FiNavigation2 />
              </Fab>
            )}
          </ScrollTo>
        </FabStyled>
      )}

      <Autocomplete
        id="combo-box-demo"
        options={languages}
        getOptionLabel={option => option}
        autoHighlight
        freeSolo
        style={{
          flex: 1,
          border: 0,
          borderRadius: 8,
          padding: 8,
        }}
        value={languageFilter}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            label="Digite o nome da linguagem"
            margin="normal"
            variant="outlined"
            style={{ backgroundColor: '#FFF' }}
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />

      <PagesIndex>
        {currentPageRepos.length > 0 && (
          <Pagination count={100} page={page} onChange={handlePageChange} />
        )}
      </PagesIndex>

      <Repositories>
        {loading && !error ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <SkeletonDiv key={item}>
                <Skeleton variant="circle" width={64} height={64} />
                <div>
                  <Skeleton variant="text" width={700} />
                  <Skeleton variant="text" width={700} />
                </div>
              </SkeletonDiv>
            ))}
          </>
        ) : (
          currentPageRepos.map(repository => (
            <a href={repository.html_url} key={repository.full_name}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />

              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          ))
        )}
      </Repositories>
    </>
  );
};

export default Dashboard;
