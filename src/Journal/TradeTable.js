import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

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

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      editable: false,
      fixed: 'left'
    },
    {
      title: 'EntryDate',
      dataIndex: 'entryDate',
      editable: true,
      fixed: 'left'
    },
    {
      title: 'ExitDate',
      dataIndex: 'exitDate',
      editable: true
    },
    {
      title: 'Instrument',
      dataIndex: 'instrument',
      editable: true
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      editable: true
    },
    {
      title: 'Buy/Sell',
      dataIndex: 'buyOrSell',
      editable: true
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: true
    },
    {
      title: 'Entry Price',
      dataIndex: 'entry',
      editable: true
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit',
      editable: true
    },
    {
      title: 'Take Profit',
      dataIndex: 'takeProfit',
      editable: true
    },
    {
      title: 'Stop Loss',
      dataIndex: 'stopLoss',
      editable: true
    },
    {
      title: 'Risk %',
      dataIndex: 'riskPercentage',
      editable: true
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
      editable: true
    },
    {
      title: 'Gain $',
      dataIndex: 'gain',
      editable: true
    },
    {
      title: 'Original TP Hit',
      dataIndex: 'hitOrigTP',
      editable: true
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      editable: true,
    },
    {
      title: 'edit',
      dataIndex: 'operation',
      fixed: 'right',
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
            Edit
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
        bordered
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
