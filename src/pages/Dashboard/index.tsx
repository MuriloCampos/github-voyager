import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import api from '../../services/api';
import { languages } from '../../utils/languages';

import logoImg from '../../assets/logo.png';

import { Title, Repositories, PagesIndex, SkeletonDiv } from './styles';

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

  const getRepos = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get(
        `search/repositories?q=language:${languageFilter}&page=${page}&per_page=10`,
      );
      setLoading(false);
      setError('');

      const repos = response.data.items;
      const pagesCount = response.headers.link
        .split(',')[1]
        .split('&')[1]
        .split('=')[1];

      setCurrentPageRepos(repos);
      setNumberOfPages(parseInt(pagesCount, 0));
    } catch (err) {
      setError('Houve um problema na requisicao');
      console.log(err.message);
    }
  }, [languageFilter, page]);

  useEffect(() => {
    if (languages.includes(languageFilter)) {
      getRepos();
    }
  }, [page, languageFilter, getRepos]);

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

  return (
    <>
      <img src={logoImg} alt="Github Voyager" />
      <Title>Explore repositórios no Github.</Title>

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
        {numberOfPages > 0 && (
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handlePageChange}
            siblingCount={15}
            size="large"
          />
        )}
      </PagesIndex>

      <Repositories>
        {loading && !error ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <SkeletonDiv>
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
