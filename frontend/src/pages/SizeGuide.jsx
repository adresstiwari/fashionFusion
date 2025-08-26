import React from 'react';

const SizeGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Size Guide</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Clothing Size Guide</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Size</th>
                <th className="border border-gray-300 px-4 py-2">Chest (inches)</th>
                <th className="border border-gray-300 px-4 py-2">Waist (inches)</th>
                <th className="border border-gray-300 px-4 py-2">Hip (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">XS</td>
                <td className="border border-gray-300 px-4 py-2">32-34</td>
                <td className="border border-gray-300 px-4 py-2">25-27</td>
                <td className="border border-gray-300 px-4 py-2">35-37</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">S</td>
                <td className="border border-gray-300 px-4 py-2">35-37</td>
                <td className="border border-gray-300 px-4 py-2">28-30</td>
                <td className="border border-gray-300 px-4 py-2">38-40</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">M</td>
                <td className="border border-gray-300 px-4 py-2">38-40</td>
                <td className="border border-gray-300 px-4 py-2">31-33</td>
                <td className="border border-gray-300 px-4 py-2">41-43</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">L</td>
                <td className="border border-gray-300 px-4 py-2">41-43</td>
                <td className="border border-gray-300 px-4 py-2">34-36</td>
                <td className="border border-gray-300 px-4 py-2">44-46</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">XL</td>
                <td className="border border-gray-300 px-4 py-2">44-46</td>
                <td className="border border-gray-300 px-4 py-2">37-39</td>
                <td className="border border-gray-300 px-4 py-2">47-49</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">How to Measure</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
            <li><strong>Waist:</strong> Measure around your natural waistline</li>
            <li><strong>Hip:</strong> Measure around the fullest part of your hips</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;