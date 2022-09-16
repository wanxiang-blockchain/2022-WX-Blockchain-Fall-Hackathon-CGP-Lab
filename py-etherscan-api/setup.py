from distutils.core import setup

setup(
    name='py_etherscan_api',
    version='0.7.0',
    packages=['examples', 'examples.stats', 'examples.tokens', 'examples.accounts', 'etherscan'],
    url='https://github.com/corpetty/py-etherscan-api',
    license='MIT',
    description='Python Bindings to Etherscan.io API',
    install_requires=[
        'requests==2.18.4',
    ],
)
