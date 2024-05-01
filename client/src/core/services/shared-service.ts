export const  saveLocalStorageData = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getLocalStorageDataByKey = (key: string): any => {
    const data = localStorage.getItem(key);
    return data ? safeJSONParse(data) : null;
}

export const safeJSONParse = (str:any) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }
