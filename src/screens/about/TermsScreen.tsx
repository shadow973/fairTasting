import React from 'react';
import { StyleSheet } from 'react-native';
import View from '@fair/components/common/View';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';


export default function TermsScreen(){
    
    return (
        <FTWebLayout>
            <View style={styles.darkContainer}>
            <h2>Terms of Service</h2>
    <p>These Terms of Service govern your use of fairTasting, our website located at <a href="https://fairtasting.com">https://fairtasting.com</a>, and any related services provided by fairTasting ApS. </p>
    <p>When you create an fairTasting account or use fairTasting, you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from further using
        the app, accessing our website, or using any other services provided by fairTasting ApS. </p>
    <p>If you access or download fairTasting from (1) the Apple App Store, you agree to any Usage Rules set forth in the App Store Terms of Service; and/or (2) the Google Play Store, you agree to the Android, Google Inc. Terms and Conditions including the
        Google Apps Terms of Service. </p>
    <p>We, fairTasting ApS, reserve the right to review and amend any of these Terms of Service at our sole discretion. Upon doing so, we will update this page and notify you through the app and/or the email address you provided when you created your account.
        Any changes to these Terms of Service will take effect immediately from the date of publication. </p>
    <p>These Terms of Service were last updated on 21 June 2021. </p>
    <h3>Limitations of Use</h3>
    <p>By using fairTasting and our website, you warrant on behalf of yourself, any entity who you represent who has entered into these Terms of Service, and your users that you will not: </p>
    <ol>
        <li>modify, copy, prepare derivative works of, decompile, or reverse engineer fairTasting or any materials and software contained within fairTasting or on our website;</li>
        <li>remove any copyright or other proprietary notations from fairTasting or any materials and software contained within fairTasting or on our website;</li>
        <li>transfer fairTasting or any of its associated materials to another person or &ldquo;mirror&rdquo; the materials on any other server;</li>
        <li>knowingly or negligently use fairTasting or any of its associated services in a way that abuses or disrupts our networks or any other service fairTasting ApS provides;</li>
        <li>use fairTasting or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material;</li>
        <li>use fairTasting or its associated services in violation of any applicable laws or regulations;</li>
        <li>use fairTasting to send unauthorised advertising or spam;</li>
        <li>harvest, collect, or gather user data without the user’s consent; or</li>
        <li>use fairTasting or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.</li>
    </ol>
    <h3>Intellectual Property</h3>
    <p>The intellectual property in the materials in fairTasting and on our website are owned by or licensed to fairTasting ApS. You may download fairTasting to view, use and display the application on your mobile device for your personal use only. </p>
    <p>This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or these Terms of Service and may be terminated by fairTasting ApS at any time. </p>
    <h3>User-Generated Content</h3>
    <p>You retain your intellectual property ownership rights over content you submit to us for publication within fairTasting and/or on its corresponding website. We will never claim ownership of your content but we do require a license from you in order
        to use it. </p>
    <p>When you use fairTasting or its associated services to post, upload, share or otherwise transmit content covered by intellectual property rights, you grant to us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use,
        distribute, modify, run, copy, publicly display, translate or otherwise create derivative works of your content in a manner that is consistent with your privacy preferences and our Privacy Policy. </p>
    <p>The license you grant us can be terminated at any time by deleting your content or account. However, to the extent that we (or our partners) have used your content in connection with commercial or sponsored content, the license will continue until
        the relevant commercial or post has been discontinued by us. </p>
    <p>You give us permission to use your username and other identifying information associated with your account in a manner that is consistent with your privacy preferences and our Privacy Policy. </p>
    <h3>Automatic Updates</h3>
    <p>You give us permission to download and install updates to fairTasting on your device in accordance with your privacy preferences. This permission can be revoked at any time by deleting fairTasting from your device. </p>
    <h3>Liability</h3>
    <p>fairTasting and the materials in fairTasting and on our website are provided on an 'as is' basis. To the extent permitted by law, fairTasting ApS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
        without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights. </p>
    <p>In no event shall fairTasting ApS or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use fairTasting, our website, or any other services provided by fairTasting
        ApS or the materials in fairTasting, even if fairTasting ApS or an authorised representative has been notified, orally or in writing, of the possibility of such damage. </p>
    <p>In the context of this agreement, &ldquo;consequential loss&rdquo; includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss
        of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity or otherwise. </p>
    <p>Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you. </p>
    <h3>Accuracy of Materials</h3>
    <p>The materials appearing in fairTasting or on our website are not comprehensive and are for general information purposes only. To the extent permitted by law, fairTasting ApS does not warrant or make any representations concerning the accuracy, likely
        results, or reliability of the use of the materials in fairTasting or on our website, or otherwise relating to such materials or on any resources linked to fairTasting and our website. </p>
    <h3>Links</h3>
    <p>fairTasting ApS has not reviewed all of the sites linked to fairTasting or on its corresponding website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval or control by fairTasting
        ApS of the site. Use of any such linked website is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites. </p>
    <h3>Notice regarding Apple</h3>
    <p>To the extent that you are using or accessing fairTasting on an iOS device, you acknowledge and agree to the terms of this clause. You acknowledge that these Terms of Service are between you and fairTasting ApS only, not with Apple Inc. (Apple), and
        Apple is not responsible for fairTasting and any materials available in fairTasting. </p>
    <p>Apple has no obligation to furnish you with any maintenance and support services with respect to fairTasting. </p>
    <p>If fairTasting fails to conform to any applicable warranty, you may notify Apple and Apple will refund the purchase price of the mobile application to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation
        whatsoever with respect to fairTasting and any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be our responsibility. </p>
    <p>Apple is not responsible for addressing any claims by you or any third party relating to fairTasting or your use of fairTasting, including but not limited to (1) product liability claims; (2) any claim that our mobile application fails to conform
        to any applicable legal or regulatory requirement; and (3) claims arising under consumer protection or similar legislation. </p>
    <p>Apple is not responsible for the investigation, defence, settlement and discharge of any third-party claim that our mobile application infringes that third party’s intellectual property rights. </p>
    <p>You agree to comply with any applicable third-party terms when using fairTasting, including any Usage Rules set forth in the Apple App Store Agreement of Service. </p>
    <p>Apple and Apple’s subsidiaries are third-party beneficiaries of these Terms of Service and, upon your acceptance of these Terms of Service, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms of Service
        against you as a third-party beneficiary of these Terms of Service. </p>
    <p>You hereby represent and warrant that (1) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and (2) you are not listed on any U.S.
        Government list of prohibited or restricted parties. </p>
    <h3>Right to Terminate</h3>
    <p>We may suspend or terminate your fairTasting account and right to use fairTasting and these Terms of Service immediately upon written notice to you for any breach of these Terms of Service. </p>
    <h3>Severance</h3>
    <p>Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected. </p>
    <h3>Governing Law</h3>
    <p>These Terms of Service are governed by and construed in accordance with the laws of Denmark. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location. </p>
            </View>
        </FTWebLayout>
    );
}

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: color.white,
        paddingHorizontal: 40,
        paddingVertical: 20
    },
    darkContainer: {
        backgroundColor: color.lightGrey,
        paddingHorizontal: 40,
        paddingVertical: 20,
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },

    

});
