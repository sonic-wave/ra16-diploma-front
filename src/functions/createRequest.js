// const localhost = 'https://ra16-diploma-back-ux60.onrender.com/api/'

const localhost = "http://localhost:7070/api/";

export const createRequest = async (options) => {
  const response = await fetch(`${localhost}${options}`);
  const result = await response.json();
  return result;
};

export const createPostRequest = async (options) => {
  try {
    const response = await fetch(`${localhost}order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response;
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error during POST request:", error);
  }
};

export default createRequest;
