export const getTransactionIds = () => {
  const savedTransIds = localStorage.getItem("saved transactions")
    ? JSON.parse(localStorage.getItem("saved transactions"))
    : [];

    return savedTransIds;
};

export const saveTransIds = (transIdArr) => {
    if (transIdArr.length) {
        localStorage.setItem('saved transactions', JSON.stringify(transIdArr));
    } else {
        localStorage.removeItem('saved transactions');
    }
};

export const removeTransId = (transId) => {
    const savedTransIds = localStorage.getItem('saved transactions')
    ? JSON.parse(localStorage.getItem('saved transactions'))
    : null;

    if (!savedTransIds) {
        return false;
    }

    const updatedSavedTransIds = savedTransIds?.filter((savedTransId) => 
        savedTransId !== transId)
        localStorage.setItem('saved transactions', JSON.stringify(updatedSavedTransIds));

        return true;
};
