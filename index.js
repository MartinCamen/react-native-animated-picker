import React, { Component } from 'react'
import {
    Animated,
    Dimensions,
    Picker,
    StyleSheet,
    TouchableHighlight,
    Text,
    View,
} from 'react-native'

const deviceHeight = Dimensions.get('window').height

export default class AnimatedPicker extends Component {

    constructor(props) {
        super(props)

        this.closePicker = this.closePicker.bind(this)
    }

    static defaultProps = {
        confirmText: 'Confirm',
        confirmTextColor: '#027afe',
        backgroundColor: '#fff'
    }

    componentDidMount() {
        Animated.timing(this.props.offset, {
            duration: 300,
            toValue: 100
        }).start()
    }

    closePicker() {
        Animated.timing(this.props.offset, {
            duration: 300,
            toValue: deviceHeight
        }).start(this.props.closePicker)
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {transform: [{translateY: this.props.offset}], backgroundColor: this.props.backgroundColor}
                ]}
            >
                <View
                    style={styles.confirmButtonContainer}
                >
                    <TouchableHighlight
                        onPress={this.closePicker}
                        underlayColor='transparent'
                        style={styles.confirmButton}
                    >
                        <Text
                            style={{ color: this.props.confirmTextColor }}
                        >
                            {this.props.confirmText}
                        </Text>
                    </TouchableHighlight>
                </View>
                <Picker
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onValueChange}
                >
                    {this.props.items.map(item => (
                        <Picker.Item
                            key={`_animated_picker_key_${item.id}`}
                            value={item.id}
                            label={item.title}
                            />
                    ))}
                </Picker>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    animatedContainer: {
        zIndex: 1,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 280
    },
    confirmButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1
    },
    confirmButton: {
        padding: 10,
        paddingLeft: 0
    }
})
