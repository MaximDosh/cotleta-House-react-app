import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchProduct } from '../redux/slices/productsSlice';
import { SearchContext } from '../App';

import { Categories, BurgerBlock, Sceleton, Pagination, Sort } from '../components';
import { list } from '../components/Sort';

const Home = () => {
  const navigate = useNavigate();

  // Active category and sort selection
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.productsSlice);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filterSlice);
  const sortType = sort.sortProperty;

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  //Getting a React context
  const { searchValue } = React.useContext(SearchContext);

  //Retrieve data from the server
  const getProducts = async () => {
    //Queries
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sort = sortType;

    //Using fetch to retrieve data from the server
    // fetch(
    //   `https://6373311e0bb6b698b60492be.mockapi.io/Items?limit=8&page=${currentPage}${category}${search}&sortBy=${sort}&order=desc`,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });

    //Using axios to retrieve data from the server
    // axios
    //   .get(
    //     `https://6373311e0bb6b698b60492be.mockapi.io/Items?limit=8&page=${currentPage}${category}${search}&sortBy=${sort}&order=desc`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   });

    //Using async axios to retrieve data from the server
    dispatch(fetchProduct({ category, search, sort, currentPage }));

    window.scrollTo(0, 0);
  };

  //The first display of the page and display filtering parameters in URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //If this was the first display of the page, then check the url parameters and save them
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //If it was the first display of the page, then ask for our products
  React.useEffect(() => {
    getProducts();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const burgers = items.map((obj) => <BurgerBlock {...obj} key={obj.id} />);
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Burgers</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Sorry, there was an error</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : burgers}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
