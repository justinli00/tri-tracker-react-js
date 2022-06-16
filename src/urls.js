function apiCall(type, id = -1) {

    const apiUrl = "http://127.0.0.1:8000/api/";
    const post = "post/";
    const comments = "comments/";

    const idToString = (id) => {
        return (id === -1 ? "" : String(id));
    }

    switch (type)
    {
        //posts
        case 0:
            return apiUrl + post + idToString(id);
        case 1:
            return apiUrl + comments + idToString(id);
        case 2:
            return apiUrl + post + idToString(id) + comments;
        default:
            console.log("Invalid type of API call! type:", type, ", id: ", id);
            return "invalid id";
    }
}

export default apiCall;