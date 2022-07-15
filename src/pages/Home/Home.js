import React, { useState } from 'react'
import { Toast } from 'react-bootstrap';
import { Button, Card, CardBody, CardHeader, Input } from 'reactstrap'
import { getAllShortenedUrls, shortenURL } from '../../api/UrlAPI';
import "./Home.css"

function Home() {
  const [urlValue, setUrlValue] = useState('');
  const [newUrlValue, setNewUrlValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [urlList, setUrlList] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(newUrlValue)
    setCopied(true);
  }

  async function shorten(url) {
    try {
      const response = await shortenURL(url);
      if (response) {
        setNewUrlValue(window.location.origin + "" + response);
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
      show={success}
      position="top-center"
      className="toast"
      >
        <Toast.Header closeButton={false}>
          Successfully shortened URL
        </Toast.Header>
      </Toast>

      <Toast 
      onClose={() => setCopied(false)}
      show={copied}
      position="top-center"
      className="toast"
      delay={3000}
      autohide>
        <Toast.Header>
          Copied to clipboard
        </Toast.Header>
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

            <div className="card-content" hidden={!success}>
              <Input 
              id="url-input"
              type="url"
              className="card-content-input" 
              placeholder='Enter URL'
              value={newUrlValue}
              disabled={true}
              />
              <Button color="primary" onClick={handleCopy}>Copy</Button>
            </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home