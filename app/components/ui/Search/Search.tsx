import * as React from 'react';
import header from '~/lang/en/header';

function Search() {
  const [searchItem, setSearchItem] = React.useState('');

  return (
    <div className="flex-1 flex justify-center">
      <input
        type="text"
        value={searchItem}
        onChange={(e) => {
          setSearchItem(e.target.value);
        }}
        placeholder={header.search}
        className="w-full max-w-md h-10 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}

export default Search;
