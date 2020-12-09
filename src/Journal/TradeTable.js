import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
const originData = [{name: 'harry'}];



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
    console.log('deleting trade: ' + id);
    console.log(id);
  }

  //TODO: edits the trade
  const editTrade = async (id) => {
    console.log('editing trade: ' + id);
    console.log(id);
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => id === item.key);

      if(index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const updatedRow = newData[index];
        console.log(updatedRow);

        var newTrade = {
          entryDate: updatedRow.entryDate,
          instrument: updatedRow.instrument,
          setup: updatedRow.strategy,
          entryPrice: updatedRow.entry,
          quantity: updatedRow.quantity,
          stopLoss: updatedRow.stopLoss,
          takeProfit: updatedRow.takeProfit,
          exitDate: updatedRow.exitDate,
          exitPrice: updatedRow.exit,
          profit: updatedRow.gain,
          fees: updatedRow.fees,
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
          console.log('API RESPONSE: ',response);
          props.onSubmit();

        }).catch(err => {
          console.log(err);
        });

      } else {
        console.log('index was not in data???');
      }
    } catch (errInfo) {
      console.log('validation failed ', errInfo);
    }
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      editable: false
    },
    {
      title: 'EntryDate',
      dataIndex: 'entryDate',
      editable: true
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
      title: 'operation',
      dataIndex: 'operation',
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
              Save
            </a>
            <a onClick={cancel}>
              Cancel
            </a>
            <Popconfirm title="Sure to delete?" onConfirm={deleteTrade}>
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
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TradeTable;
