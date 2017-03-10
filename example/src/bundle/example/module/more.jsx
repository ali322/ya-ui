import React, { Component } from "react";
import ReactDOM from 'react-dom'
import _ from "lodash";
import Header from "../../common/header.jsx";
import GoTop from "@/component/gotop.jsx";
import Refresher from "@/component/refresher.jsx";
import Alert from "@/component/alert.jsx";
import ScrollSpy from "@/component/scrollspy.jsx";
import Image from "@/component/lazyload/image.jsx";
import dom from "@/lib/dom";

export default class extends Component {
    constructor(props) {
        super(props);
        let items = [],
            pageIndex = 1,
            pageSize = 5;
        for (let i = 0; i <= pageIndex * pageSize; i++) {
            items.push(i)
        }
        this.state = {
            pagination: {
                totalCount: 50,
                pageIndex,
                page: items
            },
            refresherActive: false,
            alertActive: false,
            alertContent: ''
        }
        this.handleScroll = this.handleScroll.bind(this)
    }
    handleScroll(e) {
        const scrollElement = ReactDOM.findDOMNode(e.target)
        let scrollTop = dom.scrollTop(scrollElement);
        if (scrollElement.clientHeight + scrollTop >= scrollElement.scrollHeight) {
            if (this.state.refresherActive === false) {
                this.setState({
                    refresherActive: true,
                    alertActive: true,
                    alertContent: "loading from api"
                })
            }
            this.finishRefresh()
        }
    }
    finishRefresh() {
        let { page, pageIndex, totalCount } = this.state.pagination;
        let totalPage = Math.floor(totalCount / 5);
        if (totalPage < pageIndex) {
            this.setState({
                refresherActive: false
            })
            return false;
        }
        let nextPage = pageIndex + 1;
        let nextPageCount = nextPage * 15 > totalCount ? totalCount : nextPage * 5;
        /* simulate asynchronous api request*/
        setTimeout(() => {
            let items = [];
            for (let i = pageIndex * 5; i <= nextPageCount; i++) {
                items.push(i)
            }
            page = _.union(page, items);
            this.setState({
                pagination: {
                    page,
                    pageIndex: nextPage,
                    totalCount
                },
                refresherActive: false,
                alertActive: false
            })
        }, 3000)
    }
    renderList() {
        this.list = this.state.pagination.page.map((i) => {
            return (
                <li key={i}>
                <div className="example-image">
                <ScrollSpy scrollBy=".more-example-inner">
                <Image src="/asset/image/food-q-c-500-500-4.jpg" animation="fade"/>
                </ScrollSpy>
                </div>
                <div className="example-desc">
                <h3>{"items-"+i}</h3>
                </div>
                </li>
            )
        })
        return (
            <ul className="more-example-list">{this.list}</ul>
        )
    }
    render() {
        return (
            <div className="more-example">
                <Header title="More" backButton />
                <div className="more-example-inner" onScroll={this.handleScroll} ref="more-example-inner">
                {this.renderList()}
                <GoTop relative />
                <Refresher active={this.state.refresherActive} />
                <Alert active={this.state.alertActive}>{this.state.alertContent}</Alert>
                </div>
            </div>
        )
    }
}
