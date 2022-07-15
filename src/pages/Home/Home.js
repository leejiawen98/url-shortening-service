import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Input, Toast, ToastHeader } from 'reactstrap'
import { getAllShortenedUrls, shortenURL } from '../../api/UrlAPI';
import "./Home.css"

function Home() {
  const [urlValue, setUrlValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [urlList, setUrlList] = useState('');

  const location = useLocation();

  const handleUrlInput = (e) => {
    setSuccess(false);
    setUrlValue(e.target.value);
  }

  const handleSubmit = () => {
    let noError = document.getElementById('url-input').reportValidity();
    if (noError) {
      shorten(urlValue);
    }
  }

  async function shorten(url) {
    try {
      const response = await shortenURL(url);
      if (response) {
        console.log(location.pathname + response);
        setSuccess(true);
      };
    } catch (error) {
      let msg = "";
      if (error ===  400) {
        msg = "Bad Request. Please check input format"
      }
      alert('Error: ' + msg);
    }
  }

  async function retrieveAllShortenedURLS() {
    try {
      const response = await getAllShortenedUrls();
      if (response) {
        setUrlList(response);
      }
    } catch (error) {
      let msg = "";
      if (error ===  400) {
        msg = "Bad Request. Please check input format"
      }
      alert('Error: ' + msg);
    }
  }

  return (
    <div className="content">
      <Toast 
      isOpen={success} 
      className="toast">
        <ToastHeader>Successfully shortened URL</ToastHeader>
      </Toast>
      <Card className="card">
        <CardHeader className="card-header">
          URL Shortening Service
        </CardHeader>
        <CardBody>
            <div className="card-content">
              <Input 
              id="url-input"
              type="url"
              className="card-content-input" 
              placeholder='Enter URL'
              onChange={handleUrlInput}
              value={urlValue}
              />
              <Button color="success" onClick={handleSubmit}>Submit</Button>
              </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home