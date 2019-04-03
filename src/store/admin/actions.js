import { CognitoIdentityServiceProvider } from 'aws-sdk'
import awsconfig from '@/config'

export default {
  async updateUserList ({ commit }) {
    let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider()
    let params = {
      UserPoolId: awsconfig.Auth.userPoolId, /* required */
      AttributesToGet: null,
      // Filter: 'STRING_VALUE',
      Limit: 10
      // PaginationToken: 'STRING_VALUE'
    }
    cognitoidentityserviceprovider.listUsers(params, (err, data) => {
      if (err) throw err
      else {
        commit('setUserList', data.Users)
        return data.Users
      }
    })
  }
}
