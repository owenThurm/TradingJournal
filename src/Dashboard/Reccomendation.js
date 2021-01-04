import React from 'react';
import { Card } from 'antd';

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendation: props.recommendation
    }
  }

  render() {
    return(
      <Card title='AI Suggestion' style={{width: 200, height: 138}} size={'small'}
      headStyle={{textAlign: 'center'}} type='inner' bodyStyle={{textAlign: 'center', fontSize: 18}}>
        {this.state.recommendation}
      </Card>
    )
  }


}

export default Recommendation;