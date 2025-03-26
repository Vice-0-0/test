document.getElementById('customerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // 新增代码：获取新的表单字段值
  const companyName = document.getElementById('companyName').value;
  const endUser = document.getElementById('endUser').value;
  const productName = document.getElementById('productName').value;
  const architecture = document.getElementById('architecture').value;
  const orderQuantity = document.getElementById('orderQuantity').value;

  // 这里可以添加代码将数据发送到服务器
  console.log('公司名称:', companyName);
  console.log('最终用户全称:', endUser);
  console.log('产品名称:', productName);
  console.log('运行架构:', architecture);
  console.log('下单数量:', orderQuantity);

  // 显示确认信息
  document.getElementById('customerForm').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
});