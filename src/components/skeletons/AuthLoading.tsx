import React from 'react';

export default function AuthLoading() {
  return (
    <div style={{padding: 24, maxWidth: 520, margin: '0 auto'}}>
      <div style={{height: 36, width: '60%', background: '#eaeaea', borderRadius: 6, marginBottom: 20}} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <div style={{height: 44, background: '#f4f4f4', borderRadius: 8}} />
        <div style={{height: 44, background: '#f4f4f4', borderRadius: 8}} />
        <div style={{height: 44, background: '#f4f4f4', borderRadius: 8}} />
      </div>
    </div>
  );
}
