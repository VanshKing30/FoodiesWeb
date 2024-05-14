import React from 'react'
import {RiseLoader} from 'react-spinners'
import './Loader.css'

const Loader = ({ loading }) => {
    return (
      <div className="loader-wrapper">
        <div className="loader">
          <RiseLoader color={'#36D7B7'} loading={loading} size={15} />
        </div>
      </div>
    );
  };

export default Loader
