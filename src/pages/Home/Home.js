import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Toast, ToastHeader } from 'reactstrap'
import "./Home.css"

function Home() {
  const [urlValue, setUrlValue] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUrlInput = (e) => {
    setSuccess(false);
    setUrlValue(e.target.value);
  }

  const handleSubmit = () => {
    let noError = document.getElementById('url-input').reportValidity();
    if (noError) {
      setSuccess(true);
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