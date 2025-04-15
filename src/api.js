// API 相關工具函數

const API_BASE_URL = 'https://hihitutor-backend.onrender.com';

/**
 * 獲取文件的完整 URL
 * @param {string} filePath - 文件路徑
 * @returns {string} 完整的文件 URL
 */
export const getFileUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  
  // 解碼路徑（如果已經被編碼）
  const decodedPath = decodeURIComponent(filePath);
  
  // 確保路徑以 / 開頭
  const normalizedPath = decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`;
  
  // 重新進行正確的 URL 編碼
  const encodedPath = encodeURI(normalizedPath);
  
  return `${API_BASE_URL}${encodedPath}`;
}; 