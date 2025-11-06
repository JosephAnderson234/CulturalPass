import React from 'react';

export default function OverviewLoading() {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ height: 28, width: '40%', background: '#e6e6e6', borderRadius: 6, marginBottom: 16 }} />
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ height: 140, background: '#f3f3f3', borderRadius: 10 }} />
                ))}
            </div>
        </div>
    );
}
