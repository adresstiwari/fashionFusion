import React from 'react';

const SizeGuide = () => {
  const sizeCharts = {
    women: {
      tops: [
        { size: 'XS', bust: '32"', waist: '25"', hips: '35"' },
        { size: 'S', bust: '34"', waist: '27"', hips: '37"' },
        { size: 'M', bust: '36"', waist: '29"', hips: '39"' },
        { size: 'L', bust: '38"', waist: '31"', hips: '41"' },
        { size: 'XL', bust: '40"', waist: '33"', hips: '43"' }
      ],
      bottoms: [
        { size: 'XS', waist: '25"', hips: '35"', inseam: '30"' },
        { size: 'S', waist: '27"', hips: '37"', inseam: '30"' },
        { size: 'M', waist: '29"', hips: '39"', inseam: '30"' },
        { size: 'L', waist: '31"', hips: '41"', inseam: '30"' },
        { size: 'XL', waist: '33"', hips: '43"', inseam: '30"' }
      ]
    },
    men: {
      tops: [
        { size: 'S', chest: '36"', waist: '30"', length: '28"' },
        { size: 'M', chest: '38"', waist: '32"', length: '29"' },
        { size: 'L', chest: '40"', waist: '34"', length: '30"' },
        { size: 'XL', chest: '42"', waist: '36"', length: '31"' },
        { size: 'XXL', chest: '44"', waist: '38"', length: '32"' }
      ],
      bottoms: [
        { size: '30', waist: '30"', inseam: '32"' },
        { size: '32', waist: '32"', inseam: '32"' },
        { size: '34', waist: '34"', inseam: '32"' },
        { size: '36', waist: '36"', inseam: '32"' },
        { size: '38', waist: '38"', inseam: '32"' }
      ]
    }
  };

  return (
    <div className="size-guide-page">
      <div className="container">
        <h1>Size Guide</h1>
        <p className="page-description">
          Find your perfect fit with our comprehensive size guide. All measurements are in inches.
        </p>
        
        <div className="size-tabs">
          <div className="tab active">Women's Sizes</div>
          <div className="tab">Men's Sizes</div>
        </div>
        
        <div className="size-charts">
          <div className="chart-section">
            <h3>Women's Tops & Dresses</h3>
            <div className="table-responsive">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.women.tops.map((size) => (
                    <tr key={size.size}>
                      <td>{size.size}</td>
                      <td>{size.bust}</td>
                      <td>{size.waist}</td>
                      <td>{size.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="chart-section">
            <h3>Women's Bottoms</h3>
            <div className="table-responsive">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>Inseam</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.women.bottoms.map((size) => (
                    <tr key={size.size}>
                      <td>{size.size}</td>
                      <td>{size.waist}</td>
                      <td>{size.hips}</td>
                      <td>{size.inseam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="measuring-guide">
          <h2>How to Measure</h2>
          <div className="measuring-steps">
            <div className="step">
              <h4>Bust/Chest</h4>
              <p>Measure around the fullest part of your bust/chest, keeping the tape measure horizontal.</p>
            </div>
            <div className="step">
              <h4>Waist</h4>
              <p>Measure around the narrowest part of your waist (usually just above the navel).</p>
            </div>
            <div className="step">
              <h4>Hips</h4>
              <p>Measure around the fullest part of your hips, about 8 inches below your waist.</p>
            </div>
            <div className="step">
              <h4>Inseam</h4>
              <p>Measure from the crotch to the bottom of the ankle for pants length.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;