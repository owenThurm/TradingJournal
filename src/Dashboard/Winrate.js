import { Progress } from 'antd';

const Winrate = (props) => {

    return (
        <div>
            <Progress type="circle" percent={props.winrate} width={60} />
        </div>
    );

}

export default Winrate;