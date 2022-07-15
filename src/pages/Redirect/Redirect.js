import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { redirect } from '../../api/UrlAPI';
import "./Redirect.css";
import  errorImg  from '../../error.png'

function Redirect() {

    const [error, setError] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        redirecting(window.location.pathname);
    })

    async function redirecting(shortUrl) {
        try {
          const response = await redirect(shortUrl);
          if (response) {
              setUrl(response);
            window.location.assign(response);
          };
        } catch (error) {
          let msg = "";
          if (error ===  400) {
            msg = "Bad Request"
            alert('Error: ' + msg);
          } else if (error === 404) {
              setError(true);
          }
        }
      }

  return (
      <div className="content">
        <div hidden={error} className="content-box">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span>Redirecting to <i style={{color:'green'}}>{url}</i>...</span>
        </div>
        <div hidden={!error} className="content-box-error">
            <img src={errorImg} alt="error" width="150px"/>
            <br/>
            <span>URL Not Found</span>
        </div>
      </div>
  )
}

export default Redirect