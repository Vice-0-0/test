// 引入 mammoth.js 库
// 这里假设你已经通过 CDN 引入了 mammoth.js

document.getElementById('customerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // 新增代码：获取新的表单字段值
  const companyName = document.getElementById('companyName').value;
  const endUser = document.getElementById('endUser').value;
  const productName = document.getElementById('productName').value;
  const architecture = document.getElementById('architecture').value;
  const orderQuantity = document.getElementById('orderQuantity').value;

  // 创建 HTML 模板
  const htmlTemplate = `
    <html>
      <body>
        <h1>订单信息</h1>
        <p>公司名称: ${companyName}</p>
        <p>最终用户全称: ${endUser}</p>
        <p>产品名称: ${productName}</p>
        <p>运行架构: ${architecture}</p>
        <p>下单数量: ${orderQuantity}</p>
      </body>
    </html>
  `;

  // 使用 mammoth.js 将 HTML 转换为 Word 文档
  mammoth.convertToDocx(htmlTemplate)
    .then(result => {
      const blob = new Blob([result.value], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'order_info.docx';
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('生成 Word 文档时出错:', error);
    });

  // 显示确认信息
  document.getElementById('customerForm').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
});