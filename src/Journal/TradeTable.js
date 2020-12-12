import React, { useEffect, useState, useRef } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Space } from 'antd';
import { DeleteOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TradeTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.trades);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  useEffect(() => {
    setData(props.trades);
  });

  const cancel = () => {
    setEditingKey('');
  };

  //TODO: deletes the given trade
  const deleteTrade = (id) => {
    //AXIOS delete trade endpoint
    axios({
      method: 'DELETE',
      url: '/' + props.username + '/' + id,
    }).then(response => {
      console.log('API RESPONSE: <<', response);
      setEditingKey('');
      props.onSubmit();
    }).catch(err => {
      console.log('ERROR: axios delete error: ', err);
    });



  }

  //Edits the trade
  const editTrade = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => id === item.key);

      if(index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const updatedRow = newData[index];

        var newTrade = {
          entryDate: updatedRow.entryDate,
          instrument: updatedRow.instrument,
          setup: updatedRow.strategy,
          entryPrice: parseInt(updatedRow.entry),
          quantity: parseInt(updatedRow.quantity),
          stopLoss: parseInt(updatedRow.stopLoss),
          takeProfit: parseInt(updatedRow.takeProfit),
          exitDate: updatedRow.exitDate,
          exitPrice: parseInt(updatedRow.exit),
          profit: parseInt(updatedRow.gain),
          fees: parseInt(updatedRow.fees),
          buyOrSell: updatedRow.buyOrSell == 'true',
          comments: updatedRow.comments,
          isTransaction: false,
        }

        //Axios update trade
        axios({
          method: 'POST',
          url: '/'+props.username+'/'+id+'/updatetrade',
          data: newTrade
        }).then(response => {
          //Refresh table via this.props.onSubmit
          setEditingKey('');
          props.onSubmit();
        }).catch(err => {
          console.log(err);
        });
      } else {
        console.log('ERROR >>> index was not in data???');
      }
    } catch (errInfo) {
      console.log('validation failed ', errInfo);
    }
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={ searchInput }
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text => text
  });

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      editable: false,
      fixed: 'left',
      align: 'center',
      width: 50
    },
    {
      title: 'EntryDate',
      dataIndex: 'entryDate',
      editable: true,
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
    },
    {
      title: 'ExitDate',
      dataIndex: 'exitDate',
      editable: true,
      align: 'center',
      fixed: 'left',
      sorter: (a, b) => new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime()
    },
    {
      title: 'Instrument',
      dataIndex: 'instrument',
      editable: true,
      align: 'center',
      ...getColumnSearchProps('instrument'),
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      editable: true,
      align: 'center',
      filters: props.setups.map(setup => {
        return {
          text: setup,
          value: setup
        }
      }),
      onFilter: (value, record) => record.strategy.indexOf(value) === 0,
    },
    {
      title: 'Buy/Sell',
      dataIndex: 'buyOrSell',
      editable: true,
      align: 'center',
      filters: [{
        text: 'Buy',
        value: 'BUY'
      }, {
        text: 'Sell',
        value: 'SELL'
      }],
      onFilter: (value, record) => record.buyOrSell.indexOf(value) === 0,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Entry Price',
      dataIndex: 'entry',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.entry - b.entry
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.exit - b.exit
    },
    {
      title: 'Take Profit',
      dataIndex: 'takeProfit',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.takeProfit - b.takeProfit
    },
    {
      title: 'Stop Loss',
      dataIndex: 'stopLoss',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.stopLoss - b.stopLoss
    },
    {
      title: 'Risk %',
      dataIndex: 'riskPercentage',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.risk - b.risk
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.fees - b.fees
    },
    {
      title: 'Gain $',
      dataIndex: 'gain',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.gain - b.gain
    },
    {
      title: 'Original TP Hit',
      dataIndex: 'hitOrigTP',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.hitOrigTP == 'YES' ? 1 : -1
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      editable: true,
      align: 'center',
    },
    {
      title: 'Edit',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => editTrade(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <CheckOutlined />
            </a>
            <a onClick={cancel} style={{marginRight: 8,}}>
              <CloseOutlined />
            </a>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteTrade(record.key)}>
              <a>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined />
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}

        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        scroll={{ x: 2000 }}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TradeTable;
