import React from 'react';

export default function DashboardLoading() {
  return (
    <div style={{padding: 24}}>
      <div style={{height: 28, width: '35%', background: '#e9e9e9', borderRadius: 6, marginBottom: 16}} />
      <div style={{display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr'}}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{height: 120, background: '#f6f6f6', borderRadius: 8}} />
        ))}
      </div>
    </div>
  );
}
