import React from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
} from 'react-native';

import {TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

const Item = props => {
  return (
    <View style={styles.item}>
      <Cap2 item={props.item} />
    </View>
  );
};

class Cap1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: 1,
      data: [
        {
          id: '1',
          title: '111',
        },
        {
          id: '2',
          title: '2',
        },
        {
          id: '3',
          title: '3',
        },
      ],
    };
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    const a = 1;
    const b = 1;
  }

  test = () => {
    const xxx = [
      ...this.state.data,
      {
        id: this.state.data.length + 1 + '',
        title: this.state.data.length + 1 + '',
      },
    ];
    this.setState({
      data: xxx,
    });
  };

  getItemCount = data => (data ? data.length : 0);

  getItem = (data, index) => {
    return data[index];
  };

  render() {
    console.log('render Cap 1');
    return (
      <View>
        <Text onPress={this.test}>Đây là cấp 1</Text>
        <VirtualizedList
          data={this.state.data}
          initialNumToRender={4}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => {
            return item.id;
          }}
          getItemCount={this.getItemCount}
          getItem={this.getItem}
        />
      </View>
    );
  }
}

class Cap2 extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Did mount render Cap 2:' + this.props.item.title);
  }

  render() {
    console.log('render Cap 2:' + this.props.item.title);
    return (
      <View>
        <Cap3 item={this.props.item} />
      </View>
    );
  }
}

class Cap3 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('render Cap 3:' + this.props.item.title);
    return (
      <View>
        <Text>Đây là item: {this.props.item.title}</Text>
      </View>
    );
  }
}

export default Cap1;
