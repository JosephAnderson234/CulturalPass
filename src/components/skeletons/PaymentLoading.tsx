import React from 'react';

export default function PaymentLoading() {
  return (
    <div style={{padding: 24, maxWidth: 720, margin: '0 auto'}}>
      <div style={{height: 28, width: '45%', background: '#ededed', borderRadius: 6, marginBottom: 18}} />
      <div style={{display: 'grid', gap: 12}}>
        <div style={{height: 56, background: '#f6f6f6', borderRadius: 8}} />
        <div style={{height: 240, background: '#f7f7f7', borderRadius: 8}} />
      </div>
    </div>
  );
}
