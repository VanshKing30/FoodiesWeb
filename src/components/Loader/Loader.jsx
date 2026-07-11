import React from 'react'
import {RiseLoader} from 'react-spinners'
import './Loader.css'

const Loader = ({ loading }) => {
    return (
      <div className="loader-wrapper">
        <div className="loader">
          <RiseLoader color={'#1e3a8a'} loading={loading} size={15} />
        </div>
      </div>
    );
  };

export default Loader
