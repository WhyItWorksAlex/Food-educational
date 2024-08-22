const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {                               // headers нужны только для JSON, для FormData не нужны
      'Content-type': 'application/json'
    },
    body: data,
  });

  return res.json();
}

export {postData}