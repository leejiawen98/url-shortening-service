import React, { useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap';
import { Button, Card, CardBody, CardHeader, Input } from 'reactstrap'
import { getAllShortenedUrls, shortenURL } from '../../api/UrlAPI';
import "./Home.css"

function Home() {
  const [urlValue, setUrlValue] = useState('');
  const [newUrlValue, setNewUrlValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const [showUrlList, setShowUrlList] = useState(false);

  useEffect(() => {
    retrieveAllShortenedURLS();
  }, [])

  const handleUrlInput = (e) => {
    setSuccess(false);
    setUrlValue(e.target.value);
  }

  const handleSubmit = () => {
    let noError = document.getElementById('url-input').reportValidity();
    if (noError && urlValue) {
      shorten(urlValue);
    }

    if (!urlValue) {
      alert('Please input a value')
    }
  }

  function handleCopy(url) {
    navigator.clipboard.writeText(url)
    setCopied(true);
  }

  const handleShow = () => {
    if (showUrlList) {
      setShowUrlList(false);
    } else {
      setShowUrlList(true);
    }
  }

  async function shorten(url) {
    try {
      const response = await shortenURL(url);
      if (response) {
        setNewUrlValue(window.location.origin + "" + response);
        setSuccess(true);
        retrieveAllShortenedURLS();
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

  const convertedUrlList = urlList.map((value, key) => {
    return (
      <li key={key}>
        <a href={value.url}>
          {value.url}
        </a>

        <span>
        <a href={window.location.origin + value.short_url}>
          {window.location.origin}{value.short_url}
        </a>
        <Button 
        className="copy-button"
        size="sm" 
        color="primary" 
        onClick={() => handleCopy(window.location.origin + value.short_url)}>
          Copy
        </Button>
        </span>
       
      </li>
    )
  })

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
              placeholder='Enter URL: https://www.example.com'
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
              <Button color="primary" onClick={() => handleCopy(newUrlValue)}>Copy</Button>
            </div>
        </CardBody>
      </Card>

      <Button className="show-button" color="warning" onClick={handleShow}>Show all converted urls</Button>
      <Card hidden={!showUrlList} className="card-list">
        <CardHeader>
          List of all converted URLs
        </CardHeader>
        <CardBody>
          <ul>
            <li style={{'font-weight':'bold'}}>
              <span>Original URL</span>
              <span>Converted URL</span>
            </li>
            {convertedUrlList}
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home