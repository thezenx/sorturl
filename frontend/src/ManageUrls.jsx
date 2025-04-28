import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function ManageUrlsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getUrls")
      .then((response) => {
        setUrls(response.data.urls); 
      })
      .catch((error) => {
        console.error("There was an error fetching the URLs!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .get(`http://localhost:8000/api/updateUrl/${id}`)
      .then((response) => {
        setUrls(urls.filter((url) => url.id_url !== id));
        alert("URL marked as deleted successfully!");
      })
      .catch((error) => {
        alert("Failed to mark the URL as deleted.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md">
        <h1>Manage URLs</h1>
        <br />
        <div className="overflow-x-auto">
          {" "}
          <table className="table w-full">
            <thead>
              <tr>
                <th>URL Original</th>
                <th>URL Short</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={url.id}>
                  <td>
                    <a
                      href={url.original_url}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.original_url.length > 200
                        ? url.original_url.substring(0, 200) + "..."
                        : url.original_url}
                    </a>
                  </td>

                  <td>
                    <a
                      href={`http://localhost:8000/${url.short_code}`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      http://localhost:8000/{url.short_code}
                    </a>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(url.id_url)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
