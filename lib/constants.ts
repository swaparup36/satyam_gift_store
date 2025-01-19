import * as fs from 'fs';

interface categoriesObj {
  categories: string[]
}

const filePath = './lib/categories.json';


const data = fs.readFileSync(filePath, 'utf-8');
export const categories = JSON.parse(data).categories;