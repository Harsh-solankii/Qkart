const API_BASE_URL = "http://localhost:3000";

interface options {
  method: string,
  headers:object,
  body: object,
}

export async function fetchdata(endpoint:string, options:options | object = {}) {
 
  const token = localStorage.getItem("token");
  let total_options : object;
  
  if (Object.keys(options).length !== 0) {
    if (Object.prototype.hasOwnProperty.call(options, "headers")) {
      (options as options).headers = {
        Authorization: "Bearer" + " " + `${token}`,
      ...(options as options).headers,
    };
  } else {
    (options as options).headers = {
      Authorization: "Bearer" + " " + `${token}`,
    };
  }
  total_options = { ...options };
}else{
  const fetch_options = {
    headers: {
      Authorization: "Bearer" + " " + `${token}`,
    },
  };
  total_options = { ...fetch_options };
  
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, total_options);
    if (!response.ok) {
      localStorage.clear();
      location.reload();
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error:any) {
    handleError(error);
  }
}

const handleError = (error:Error) => {
  console.error("API call error:", error.message);
  throw error; // Re-throw the error after logging
};
