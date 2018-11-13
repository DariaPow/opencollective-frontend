import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Link from '../components/Link';

import colors from '../constants/colors';

import withIntl from '../lib/withIntl';
import withData from '../lib/withData';
import withLoggedInUser from '../lib/withLoggedInUser';

class SubscriptionsRedirectPage extends React.Component {
  static propTypes = {
    getLoggedInUser: PropTypes.func.isRequired, // from withLoggedInUser
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { getLoggedInUser } = this.props;
    const LoggedInUser = await getLoggedInUser(this.setState.bind(this));
    this.setState({ LoggedInUser });

    if (!LoggedInUser) {
      Router.push('/signin', '/signin?next=/subscriptions');
    } else {
      setTimeout(
        () =>
          Router.push(
            `/subscriptions?collectiveSlug=${LoggedInUser.collective.slug}`,
            `/${LoggedInUser.collective.slug}/subscriptions`,
          ),
        4000,
      );
    }
  }

  render() {
    const { LoggedInUser } = this.state;
    return (
      <div className="SubscriptionsPage">
        <Header
          title={'Subscriptions'}
          description="All the collectives that you are giving money to"
          LoggedInUser={this.state.LoggedInUser}
        />
        <style jsx>
          {`
            .Subscriptions-container {
              background-color: ${colors.offwhite};
              overflow: hidden;
              min-height: 500px;
            }
            .content {
              align-items: left;
              color: black;
              margin: auto;
              margin-top: 100px;
              margin-left: 32px;
              max-width: 1024px;
            }
            .small .content {
              margin-top: 0px;
            }
            .Subscriptions-header {
              text-align: left;
              overflow: hidden;
              max-width: 1024px;
            }
            .Subscriptions-title {
              margin: auto;
              font-size: 40px;
              font-weight: 700;
              line-height: 1.08;
              text-align: left;
              color: ${colors.black};
              border-left: 4px solid ${colors.ocblue};
              padding-left: 32px;
            }
            .link {
              cursor: pointer;
              color: ${colors.blue};
            }
            .redirect-message {
              padding-top: 25px;
              font-size: 24px;
              font-weight: 500;
              padding: 37px;
            }
          `}
        </style>
        <Body>
          <div className="SubscriptionsRedirect-container">
            <div className="content">
              <div className="Subscriptions-header">
                <div className="Subscriptions-title">
                  {this.state.LoggedInUser && (
                    <div>
                      This page has moved. Your subscriptions are now at
                      <Link
                        route={'subscriptions'}
                        params={{
                          collectiveSlug: LoggedInUser.collective.slug,
                        }}
                      >
                        <span className="link">
                          {' '}
                          /{LoggedInUser.collective.slug}
                          /subscriptions
                        </span>
                      </Link>
                      . Redirecting...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }
}

export default withData(withIntl(withLoggedInUser(SubscriptionsRedirectPage)));
