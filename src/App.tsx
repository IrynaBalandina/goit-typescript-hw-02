
import style from './App.module.css';
import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import { Image } from './App.types';

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const ACCESS_KEY = 'dJMNIBDQM4IUQmOJyojebfgPZmGXxszASKeEIS0z8fs';
  const fetchImages = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<{ results: Image[] }>(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            query,
            page,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      setImages(prevImages => [...prevImages, ...response.data.results]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      } finally {
      setLoading(false);
    }
  }, [query, page]);


  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }

    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setError(null);
      setSelectedImage(null);
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <div className={style.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      {!error && images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {!error && images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      <ImageModal
        isOpen={Boolean(selectedImage)}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
