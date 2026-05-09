import { Table } from 'antd';
import MemberColumns from '../Columns/MembersColumns';

const UsersTable = ({
  dataSource,
  handleViewDetails,
  loading = false
}) => {

  return (
    <Table
      columns={MemberColumns(handleViewDetails)}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: 1000 }}
      rowKey="id"
      pagination={false}
      locale={{ emptyText: "No users found" }}
    />
  );
};

export default UsersTable;