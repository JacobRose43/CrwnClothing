import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments('categories');
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	// useEffect(() => {
	// 	addCollectionAndDocuments('categories', SHOP_DATA);
	// }, []);
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// setting values to firebase

	const value = { categoriesMap };

	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
