import { CognitoIdentityServiceProvider } from 'aws-sdk'
import awsconfig from '@/config'
export default {
  async listUsers ({ commit }) {
    let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider()
    let params = {
      UserPoolId: awsconfig.Auth.userPoolId, /* required */
      AttributesToGet: null,
      // Filter: 'STRING_VALUE',
      Limit: 10
      // PaginationToken: 'STRING_VALUE'
    }
    cognitoidentityserviceprovider.listUsers(params, (data, err) => {
      if (err) console.log(err)
      else console.log(data)
    })
  }
}
