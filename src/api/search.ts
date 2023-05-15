import apiRequest from './index';

// getSearch API data
export const getSearchData = async (data: string, setData: any) => {
  if (data.length === 0) {
    return;
  }
  const getLocalData: any = localStorage.getItem(`${data}`);

  if (getLocalData) {
    setData(JSON.parse(getLocalData));
  } else {
    const response = await apiRequest
      .get(`/search/?q=${data}&page=1&limit=10`)
      .then((res: any) => {
        if (res.data.result.length !== 0) {
          localStorage.setItem(data, JSON.stringify(res.data.result));
        }
        return res.data.result;
      })
      .catch((err) => console.log('err', err));

    setData(response);
  }
};
