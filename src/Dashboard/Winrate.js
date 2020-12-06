import { Tooltip, Progress } from 'antd';

import "antd/dist/antd.css";

const Winrate = (props) => {

    return (
        <div>
            <Tooltip>
                <Progress strokeColor='red' trailColor='gray'
                percent={props.loseRate+props.winRate}
                success={{ percent: props.winRate, strokeColor: 'blue' }} type="circle" />
            </Tooltip>
        </div>
    );
}

export default Winrate;