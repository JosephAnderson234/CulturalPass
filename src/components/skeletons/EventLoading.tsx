import React from 'react';

export default function EventLoading() {
  return (
    <div style={{padding: 24}}>
      <div style={{height: 300, background: '#efefef', borderRadius: 10, marginBottom: 20}} />
      <div style={{display: 'grid', gap: 12}}>
        <div style={{height: 20, width: '50%', background: '#f3f3f3', borderRadius: 6}} />
        <div style={{height: 16, width: '70%', background: '#f3f3f3', borderRadius: 6}} />
        <div style={{height: 16, width: '90%', background: '#f3f3f3', borderRadius: 6}} />
      </div>
    </div>
  );
}
