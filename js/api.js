const getData = ( onSuccess ) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((responce) => responce.json())
    .then((hotels) => {
      onSuccess(hotels);
    });
};

const sendData = ( onSuccess, onSending, onFail, body ) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  ).then(( responce ) => {
    if ( responce.ok ) {
      onSuccess();
      onSending();
    } else {
      throw new Error();
    }
  })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
