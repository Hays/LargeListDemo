/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import { LargeList } from 'react-native-largelist-v3';
import rnTextSize from 'react-native-text-size'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Comment = {
  name: string,
  content: string
}

const mockData: Comment[] = []

for (let index = 0; index < 50; index++) {
  let content = ''
  for (let i = 0; i < index; i++) {
    content += `content - ${index}`
  }
  if (index === 0) {
    content = `content - ${index}`
  }
  mockData.push({
    name: `name - ${index}`,
    content
  })
}

type Props = {};
type State = {
  comments: Comment[],
  heights: number[]
}
export default class App extends Component<Props, State> {
  _renderIndexPath: Function
  _heightForIndexPath: Function
  constructor(props: Props) {
    super(props)
    this._renderIndexPath = this._renderIndexPath.bind(this)
    this._heightForIndexPath = this._heightForIndexPath.bind(this)
    this.state = {
      comments: [{ items: [] }],
      heights: []
    }
  }
  componentDidMount() {
    const allContent: string[] = []
    mockData.forEach(c => {
      allContent.push(`name: ${c.name}, content: ${c.content}`)
    })
    const width = Dimensions.get('window').width - 75
    console.log('>>> test by Hays 444 .. ', width)
    const params = {
      text: allContent,
      width,
      fontSize: 14,
      allowFontScaling: false,
    }
    rnTextSize.flatHeights(params).then(ret => {
      this.setState({
        heights: ret,
        comments: [{ items: mockData }]
      })
    })
  }
  _heightForIndexPath({ row }) {
    if (this.state.heights.length > 0) {
      const singleLine = this.state.heights[0]
      const rowHeight = this.state.heights[row]
      const dis = rowHeight - singleLine
      // const height = 60 + rowHeight - singleLine
      console.log('>>> test by Hays ... ', rowHeight, row)
      // return height
      // if (rowHeight > singleLine) {
        
      // }
      const height = rowHeight + 30
      if (height > 60) {
        return height
      }
    }
    return 62
  }
  _onItemLayout(event) {
    console.log('>>> test by Hays333 ... ', event.nativeEvent.layout.width)
  }
  _renderIndexPath({ row }) {
    const item = this.state.comments[0].items[row]
    return (
    <View style={styles.item}>
      <View style={styles.itemContainer}>
        <View style={styles.avatar} />
        <Text style={styles.content} onLayout={this._onItemLayout}>{`name: ${item.name}, content: ${item.content}`}</Text>
      </View>
      <View style={styles.separator} />
    </View>
    )
  }
  _renderHeader() {
    return (
      <View style={styles.header} />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <LargeList
        style={styles.list}
        data={this.state.comments}
        renderIndexPath={this._renderIndexPath}
        heightForIndexPath={this._heightForIndexPath}
        renderHeader={this._renderHeader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flex: 1,
    backgroundColor: '#ff0000',
    width: '100%',
  },
  header: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue'
  },
  item: {
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 15,
  },
  content: {
    flex: 1,
    backgroundColor: 'blue',
    fontSize: 14,
    marginLeft: 15,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    height: 1,
  }
});
