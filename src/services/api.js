

const API = {
  getFolderStructure: async () => {
    // 실제로는 서버에서 데이터를 가져와야 하지만, 여기서는 하드코딩된 데이터를 반환합니다.
    return [
      "./Project_2023",
      "./Project_2023/MainCategory",
      "./Project_2023/MainCategory/SubCategory2",
      "./Project_2023/MainCategory/SubCategory2/SubSubCategory2",
      "./Project_2023/MainCategory/SubCategory3",
      "./Project_2023/MainCategory/SubCategory3/SubSubCategory3",
      "./Project_2023/MainCategory/SubCategory1",
      "./Project_2023/MainCategory/SubCategory1/SubSubCategory1"
    ];
  }
};

export default API;