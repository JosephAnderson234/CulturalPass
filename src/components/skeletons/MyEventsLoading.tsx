import React from 'react';

export default function MyEventsLoading() {
  return (
    <div style={{padding: 24}}>
      <div style={{height: 28, width: '40%', background: '#eaeaea', borderRadius: 6, marginBottom: 16}} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {[1,2,3].map(i => (
          <div key={i} style={{height: 80, background: '#f5f5f5', borderRadius: 8}} />
        ))}
      </div>
    </div>
  );
}
