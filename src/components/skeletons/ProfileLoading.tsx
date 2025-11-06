import React from 'react';

export default function ProfileLoading() {
  return (
    <div style={{padding: 24, maxWidth: 720, margin: '0 auto'}}>
      <div style={{display: 'flex', gap: 16, alignItems: 'center', marginBottom: 18}}>
        <div style={{height: 96, width: 96, borderRadius: '50%', background: '#f0f0f0'}} />
        <div style={{flex: 1}}>
          <div style={{height: 20, width: '50%', background: '#efefef', borderRadius: 6, marginBottom: 8}} />
          <div style={{height: 14, width: '30%', background: '#f3f3f3', borderRadius: 6}} />
        </div>
      </div>
      <div style={{display: 'grid', gap: 12}}>
        <div style={{height: 44, background: '#fafafa', borderRadius: 8}} />
        <div style={{height: 44, background: '#fafafa', borderRadius: 8}} />
      </div>
    </div>
  );
}
