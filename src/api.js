// API 相關工具函數

const API_BASE_URL = 'https://hihitutor-backend.onrender.com/api';

/**
 * 獲取文件的完整 URL
 * @param {string} filePath - 文件路徑
 * @returns {string} 完整的文件 URL
 */
export const getFileUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  return `${API_BASE_URL.replace('/api', '')}${filePath}`;
}; 