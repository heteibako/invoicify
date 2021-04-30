import React from 'react';

interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return (
    <div className='row'>
      <div className='col'>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default SectionHeader;
